# dataProcessor.py
import spacy
import sys
import data_loader
import similarities


def process_data(selected_room, input_value):
    print(input_value)
    #load data
    nlp = spacy.load("en_core_web_md")
    bedroom_files, bedrooms, living_rooms_files, living_rooms, kitchens_files, kitchens, dining_files, dining, bathroom_files, bathrooms = data_loader.load_files()

    # Combine the strings into an array
    selected_room = selected_room.lower()
    input_value = input_value.lower()

    

    #здесь мы получаем три картинки с локальными адресами, с именами файлов и со значением метрики
    if selected_room == 'bedroom':
        top_results = similarities.find_similar_rooms(selected_room, bedrooms, bedroom_files, 'pictures/Bedroom/',nlp)
    elif selected_room == 'living room':
        top_results = similarities.find_similar_rooms(selected_room, living_rooms, living_rooms_files, 'pictures/Livingroom/',nlp)
    elif selected_room == 'kitchen':
        top_results = similarities.find_similar_rooms(selected_room, kitchens, kitchens_files, 'pictures/Kitchen/',nlp)
    elif selected_room == 'bathroom':
        top_results = similarities.find_similar_rooms(selected_room, bathrooms, bathroom_files, 'pictures/Bathroom/',nlp)
    elif selected_room == 'dining':
        top_results = similarities.find_similar_rooms(selected_room, dining, dining_files, 'pictures/Dining/',nlp)
    
    result = [top_results[0]['Image Path'], top_results[1]['Image Path'],top_results[2]['Image Path']]
    
        
    return result



if __name__ == "__main__":
    # Retrieve arguments from command line
    selected_room = sys.argv[1]
    input_value = sys.argv[2]
   

    # # Process data and print the result
    result = process_data(selected_room, input_value)
    print(result)
