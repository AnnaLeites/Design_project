# dataProcessor.py

import sys

def process_data(selected_room, input_value):
    # Print received data
   # print(f"Received data from Node.js - Room: {selected_room}, Input: {input_value}")

    # Combine the strings into an array
    data_array = [selected_room, input_value]

    # Return the length of the array
    return len(data_array)

if __name__ == "__main__":
    # Retrieve arguments from command line
    selected_room = sys.argv[1]
    input_value = sys.argv[2]

    # Process data and print the result
    result_length = process_data(selected_room, input_value)
    print(result_length)
