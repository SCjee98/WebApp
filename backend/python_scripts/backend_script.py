import sys
import json

def calculate_sum(numbers):
    return sum(numbers)

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1])
        result = calculate_sum(input_data)
        print(result)
    except:
        print("Error: Invalid input")
