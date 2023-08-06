import aspose.pdf as ap

document = ap.Document("input2.pdf")

 

# Instantiate a TextFragmentAbsorber object

txtAbsorber = ap.text.TextFragmentAbsorber("Tengiz")

 

# Search text

document.pages.accept(txtAbsorber)

 

# Get reference to the found text fragments

textFragmentCollection = txtAbsorber.text_fragments

for frag in textFragmentCollection:

    print(frag.text)

# Parse all the searched text fragments and replace text

for txtFragment in textFragmentCollection:

    txtFragment.text = "that"

 

# Save the updated PDF

document.save("output.pdf")