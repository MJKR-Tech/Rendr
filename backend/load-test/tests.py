import json
import os
import requests

URL = "http://localhost:8081/api/v1"
EXCEL_PATH = os.path.join(os.getcwd(), "excel")
JSON_PATH = os.path.join(os.getcwd(), "json")

def update_path(base_path, file):
    return os.path.join(base_path, file)

def test_connection():
    path = f"{URL}/getTemplates"
    response = requests.get(path)
    assert response.status_code == 200

def get_current_template_ids():
    path = f"{URL}/getTemplates"
    response = requests.get(path)
    assert response.status_code == 200

    json_str = response.content.decode()
    json_object = json.loads(json_str)
    return set(item["templateId"] for item in json_object)

def delete_template_id(idToDelete):
    path = f"{URL}/deleteTemplate/{idToDelete}"
    response = requests.delete(path)
    assert response.status_code == 200

def verify_response(response):
    assert response.status_code == 200
    return response.elapsed.total_seconds()

def get_template_test():
    path = f"{URL}/getTemplates"
    response = requests.get(path)
    return verify_response(response)

def template_upload_test(excel_name = "Complex_Translated_Template"):
    path = f"{URL}/uploadTemplate"
    file_path = update_path(EXCEL_PATH, f"{excel_name}.xlsx")
    file = {"file": open(file_path, "rb")}
    response = requests.post(path, files=file)
    return verify_response(response)

def render_excel_test(excel_name = "Complex_Translated_Template", json_name = "Complex_Postman"):
    def setup():
        path = f"{URL}/uploadTemplate"
        excel_file_path = update_path(EXCEL_PATH, f"{excel_name}.xlsx")
        file = {"file": open(excel_file_path, "rb")}
        response = requests.post(path, files=file)
        assert response.status_code == 200
        return response

    setup_response = setup()
    id = json.loads(setup_response.content.decode())["templateId"]

    path = f"{URL}/generateData"
    json_file_path = update_path(JSON_PATH, f"{json_name}.json")
    json_data = json.load(open(json_file_path, "rb"))
    json_data["templateId"] = id
    response = requests.post(path, json=json_data)
    return verify_response(response)

def large_template_test():
    return template_upload_test("Large_Upload_Template")

def large_json_test():
    return render_excel_test("Normal_Template", "Medium_Data")

def large_hybrid_test():
    return render_excel_test("Large_Template", "Medium_Data")

def getAllTests():
    return [
        get_template_test,
        template_upload_test,
        render_excel_test,
        large_template_test,
        large_json_test,
        large_hybrid_test,
    ]
