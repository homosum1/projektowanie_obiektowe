import json
import subprocess


def delete_item(endpoint_prefix, item_id):
    delete_command = f"curl -s -X DELETE {endpoint_prefix}deleteOne/{item_id}"
    delete_process = subprocess.Popen(delete_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    delete_stderr = delete_process.communicate()

def add_item(endpoint_prefix, data):
    data_json = json.dumps(data)

    curl_command = f"curl -X POST {endpoint_prefix}addOne -H 'Content-Type: application/json' -d '{data_json}'"

    process = subprocess.Popen(curl_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode == 0:
        print("- Dodawanie elementu do bazy ✅")
    else:
        print("- Błąd dodawania elementu do bazy ❌:")

def get_all(endpoint_prefix):
    process = subprocess.Popen(f"curl -s {endpoint_prefix}getAll", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode == 0:
        items = json.loads(stdout)
        return items
    else:
        print("- Błąd wykonania polecenia GETALL ❌")

def get_one(endpoint_prefix, id):
    process = subprocess.Popen(f"curl -s {endpoint_prefix}getOne/{id}", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode == 0:
        item = json.loads(stdout)

        if item:
            print("- Pobieranie jednego elementu z listy ✅")
        else:
            print("- Błąd pobierania jednego elementu z listy ❌")
    else:
        print("- Błąd wykonania polecenia GETONE ❌")

def delete_one(endpoint_prefix, id):
    process = subprocess.Popen(f"curl -s -X DELETE {endpoint_prefix}deleteOne/{id}", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode == 0:
        items = get_all(endpoint_prefix)

        if len(items) == 0:
            print("- Usuwanie jednego elementu z listy ✅")
        else:
            print("- Błąd usuwania jednego elementu z listy ❌")
    else:
        print("- Błąd wykonania polecenia GETALL ❌")

def patch_one(endpoint_prefix, id, updated_data):
    data_json = json.dumps(updated_data)

    curl_command = f"curl -s -X PATCH {endpoint_prefix}patchOne/{id} -H 'Content-Type: application/json' -d '{data_json}'"
    process = subprocess.Popen(curl_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode == 0:
        response = json.loads(stdout)

        if response:
            print("- Aktualizacja jednego elementu z listy ✅")
        else:
            print("- Błąd aktualizacji jednego elementu z listy ❌")
    else:
        print("- Błąd wykonania polecenia PATCH ❌")
    


testData = {
    'name': 'Orange',
    'price': 3.99,
    'quantity': 15,
    'icon': '🍊'
}

updateData = {
    'price': 5,
    'quantity': 5,
}

endpoint_prefix = " http://127.0.0.1:8080/products/"




items = get_all(endpoint_prefix)
number_of_items = len(items)
number_of_items = -1



if number_of_items != 1:
    print("\nCzyszczenie bazy danych do testów 🧹\n")

    for item in items:
        delete_item(endpoint_prefix, item['id'])

    print("Usunieto wszystkie elementy z bazy, rozpoczynam testowanie:")


    add_item(endpoint_prefix, testData)

    items = get_all(endpoint_prefix)
    if len(items) == 1:
        print("- Pobieranie wszystkich elementów z listy ✅")
    else:
        print("- Błąd pobierania wszystkich elementów z listy ❌")

    
    get_one(endpoint_prefix, items[0]['id'])

    patch_one(endpoint_prefix, items[0]['id'], updateData)

    delete_one(endpoint_prefix, items[0]['id'])

    print("\n\n")