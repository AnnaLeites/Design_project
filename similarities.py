import spacy
import nltk
from data_loader import load_files
from preprocessing import replace_synonyms, custom_string_splitter
import numpy as np
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize
import re
import string
from nltk.corpus import stopwords
from nltk import pos_tag
import os


def calculate_cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))


def calculate_element_similarity(set1, set2):
    return len(set1 & set2) / len(set1 | set2)


def get_vector_representation(vector, nlp):
    vec = []
    for phrase in vector:
        tokens = nlp(phrase)
        for token in tokens:
            word = token.text
            if word in nlp.vocab:
                vec.extend(nlp(word).vector)
    return vec


def pad_vector(vector, dimension):
    return np.pad(vector, (0, dimension - len(vector)), 'constant')


def find_similar_rooms(user_input, room_type, type_files, path_beg, nlp):
    labeled_data = [word for ngram in room_type for phrase in ngram for word in phrase.split()]
    user_input = replace_synonyms(user_input, labeled_data)
    user_string = custom_string_splitter(user_input)
    user_vec = get_vector_representation(user_string, nlp)
    vecs = []
    max_dimension = 0
    for i in range(len(room_type)):
        vector = get_vector_representation(room_type[i], nlp)
        if len(vector) > max_dimension:
            max_dimension = len(vector)
        vecs.append(vector)
    for i in range(len(vecs)):
        if max_dimension < len(user_vec):
            max_dimension = len(user_vec)
        vecs[i] = pad_vector(vecs[i], max_dimension)
    user_vec = pad_vector(user_vec, max_dimension)
    element_similarities = []
    vector_similarities = []
    for i in range(len(vecs)):
        element_similarities.append(calculate_element_similarity(set(user_vec), set(vecs[i])))
        vector_similarities.append(calculate_cosine_similarity(user_vec, vecs[i]))
    overall_similarities = [0.5 * vector_sim + 0.5 * element_sim for vector_sim, element_sim in zip(vector_similarities, element_similarities)]
    results = [
        {"Similarity": overall_similarities[idx], "File Name": type_files[idx]}
        for idx in range(len(overall_similarities))
    ]
    for result in results:
        filename = result["File Name"]
        image_path = os.path.join(path_beg, filename)
        result["Image Path"] = image_path
    results.sort(key=lambda x: x["Similarity"], reverse=True)
    top_results = results[:3]
        
    return top_results