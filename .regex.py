# .regex.py

import re

# The regex pattern to find Base64 image data
pattern = r"data:image\/[a-z]+;base64,[A-Za-z0-9+\/=\s\r\n]+"

# The file to process
filename = ".test.txt"

try:
    # 1. Read the original content from the file
    with open(filename, 'r') as file:
        original_content = file.read()
    
    # 2. Use re.sub() to find all matches and replace them with an empty string ""
    cleaned_content = re.sub(pattern, "", original_content)
    
    # 3. Write the cleaned content back to the same file, overwriting it
    with open(filename, 'w') as file:
        file.write(cleaned_content)
        
    print(f"Successfully removed all Base64 image data from '{filename}'.")

except FileNotFoundError:
    print(f"Error: The file '{filename}' was not found.")
except Exception as e:
    print(f"An error occurred: {e}")