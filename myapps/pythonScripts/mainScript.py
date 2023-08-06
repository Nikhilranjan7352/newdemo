import sys
import json
import os
import docx
# import os
from dotenv import load_dotenv
from tosendmail import send_email
from attachpdf import read_and_replace_pdf_file
from config import variables



# Load environment variables from .env file



# Access the environment variables
server_folder_path = variables["SERVER_FOLDER_PATH"]
client_folder_path = variables["FRONTEND_FOLDER_PATH"]


# Read the input from stdin
def replace_variables(string, variables, new_values):
    for variable, value in zip(variables, new_values):
        string = string.replace(variable, str(value))
    return string
def createemail(userdata):
    ccuser=replace_variables(cc,columnsdata,userdata)
    subjectuser=replace_variables(subject,columnsdata,userdata)
    bodyuser=replace_variables(body,columnsdata,userdata)
    return [ccuser,subjectuser,bodyuser]


input_data = sys.stdin.read()

# Parse the JSON input into a Python object
data_array = json.loads(input_data)
pageid, useremail, password, cc, subject,body, columnsdata, rowdata = data_array
base_folder = os.path.join(server_folder_path, 'uploads')
folder_name = pageid 
folder_path = os.path.join(base_folder, folder_name)
logfilepath=folder_path+"/log.txt"
with open(logfilepath, 'w') as log_file:
        log_file.write('Logs of your request will appear here  :)\n')

# Find the Word file with a .doc or .docx extension
word_file = next((file for file in os.listdir(folder_path) if file.endswith('.pdf') or file.endswith('.pdf')), None)

print(word_file)
filepath=os.path.join(folder_path, word_file)

rowdata=rowdata[1:]
for i in rowdata:
    userdata=[]
    for key in i.keys():
        userdata.append(i[key])
    # print(userdata)
    to=userdata[0]
    ccuser,subjectuser,bodyuser=createemail(userdata)
    filename=to+'.pdf'
    outputfile=os.path.join(folder_path,filename)
    read_and_replace_pdf_file(filepath,outputfile,columnsdata,userdata)
    print("i think file is created")
    send_email(useremail, to, subjectuser, bodyuser, outputfile, "smtp.gmail.com",  587, useremail, password,logfilepath)
    print("mail sent to"+to)

   
    # createwordfile(userdata)





