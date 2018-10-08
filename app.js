let db;
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const form = document.querySelector('form');

window.onload = () => {
     let request = window.indexedDB.open('contacts', 1);//creates a DB

    request.onerror = function(){
        console.log('Error opening contacts database');
    }

    request.onsuccess = function(){
        console.log('Successfully opened!');
        db = request.result;
    }

    request.onupgradeneeded = function(e){

        let db = e.target.result;

        let objectStorage = db.createObjectStore('contacts', {keyPath: 'id', autoIncrement:true});//creates a schema
        objectStorage.createIndex('firstName', 'firstNamee', {unique:false});//creates index/columns in schema.
        objectStorage.createIndex('lastName', 'lastNamee', {unique:false});

        console.log('Database setup complete.');
    }

    form.onsubmit = addData;

 function addData(e){
        e.preventDefault();

        let newItem = { firstNamee: firstNameInput.value, lastNamee: lastNameInput.value};

        let transaction = db.transaction( ['contacts'] ,  'readwrite' );

        let objectStorage = transaction.objectStore('contacts');

        let request = objectStorage.add(newItem);

        request.onsuccess = ()=>{
            firstNameInput.value = '';
            lastNameInput.value = '';
        };

        transaction.oncomplete = ()=>{
            console.log('Transaction completed on database!');
        };

        transaction.onerror = ()=>{
            console.log('Transaction error!');
        };
    }
}