from docx import Document

def replace_variable(document, variable, new_value):
    for paragraph in document.paragraphs:
        # print(paragraph.text)
        if variable in paragraph.text:
            inline = paragraph.runs
            for i in range(len(inline)):
                if variable in inline[i].text:
                    text = inline[i].text.replace(variable, str(new_value))
                    inline[i].text = text


def read_and_replace_word_file(input_file_path, output_file_path, variables, new_values):
    print(input_file_path)
    print(output_file_path)
    print(variables)
    print(new_values)
    # Load the Word document
    doc = Document(input_file_path)
    
    

    # Replace variables with new values
    for variable, new_value in zip(variables, new_values):
        
        
        replace_variable(doc, variable, new_value)

    # Save the modified document as a new file
    doc.save(output_file_path)

# Example usage
input_file = 'input_file.docx'
output_file = 'output_file.docx'
variables = ['{name}','{fname}' ,'{des}', '{doj}', '{currdate}', '{tenure}']
new_values = ['Pari Paratha', 'Pari','Ceo Manager', '2023-01-01', '2023-06-30', '15 years']

# Call the function with input and output paths
# read_and_replace_word_file(input_file, output_file, variables, new_values)
