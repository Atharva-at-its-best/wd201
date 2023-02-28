function validate() {
    var name = document.getElementById("name");
    var password = document.getElementById("password");
    var dateofbirth = new Date(document.getElementById("dob").value);
    var currentDate = new Date();
    var age = currentDate.getFullYear() - dateofbirth.getFullYear();
    //Conditions

    if (name.value === "") {
        alert("Name is required");
        return false;
    } else if (email.value === "") {
        alert("Email is required");
        return false;
    }
    else if (!email.value.includes("@")) {
        alert("Email must include @ ");
        return false;
    }
    else if (password.value === "") {
        alert("Password is required ");
        return false;
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
        alert("Password must contain both uppercase and lowercase letters");
        return false;
    }
    else if (dob.value === "") {
        alert("Date of Birth is required");
        return false;
    }
    else if (age < 18 || age > 55) {
        alert("Date of Birth should be between 18 and 55")
    }

    else if (!acceptTerms.checked) {
        alert("Please Accept Terms & Conditions");
        return false;
    }
    else {
        return true;
    }
}

let userForm = document.getElementById("user-form")

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsandconditions}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Dob</th>
    <th class="px-4 py-2">Accepted terms?</th>
    </tr>${tableEntries} </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const saveUserform = (event) => {
    event.preventDefault();
    if (!validate()) {
        return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptedTermsandconditions = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsandconditions
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit", saveUserform)
displayEntries();