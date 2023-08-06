import textract

def read_and_print_word_file(input_file_path):
    text = textract.process(input_file_path, method='python-docx')
    print(text.decode())

# Example usage
input_file = 'input_file.docx'
read_and_print_word_file(input_file)
