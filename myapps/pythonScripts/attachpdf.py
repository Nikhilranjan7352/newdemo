import aspose.pdf as ap

def replace_variable_in_pdf(document, variable, new_value):
    # Instantiate a TextFragmentAbsorber object
    txtAbsorber = ap.text.TextFragmentAbsorber(variable)
    
    # Search text
    document.pages.accept(txtAbsorber)
    
    # Get reference to the found text fragments
    textFragmentCollection = txtAbsorber.text_fragments
    
    for txtFragment in textFragmentCollection:
        txtFragment.text = new_value

def read_and_replace_pdf_file(input_file_path, output_file_path, variables, new_values):
    # Load the PDF document
    doc = ap.Document(input_file_path)
    
    # Replace variables with new values
    for variable, new_value in zip(variables, new_values):
        replace_variable_in_pdf(doc, variable, new_value)
    
    # Save the updated PDF
    doc.save(output_file_path)

# Example usage
input_file = 'input_file.pdf'
output_file = 'output_file.pdf'
variables = ['{name}', '{fname}', '{des}', '{doj}', '{currdate}', '{tenure}']
new_values = ['Pari Paratha', 'Pari', 'Ceo Manager', '2023-01-01', '2023-06-30', '15 years']

# Call the function with input and output paths
# read_and_replace_pdf_file(input_file, output_file, variables, new_values)
