const API = 'http://localhost:3000/api/notes';
const TOKEN = '20260301eink';

// โหลดโน้ตทั้งหมด
async function fetchNotes() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById('noteList');
    list.innerHTML = '';

    data.forEach((note, i) => {
        const li = document.createElement('li');
        li.textContent = note.text;

        // ปุ่ม Delete
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteNote(i);

        // ปุ่ม Edit
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editNote(i);

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
    });
}

// เพิ่มโน้ต
async function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value;

    if (!text) return;

    await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN
        },
        body: JSON.stringify({ text })
    });

    input.value = ''; // ล้างช่อง
    fetchNotes();
}

// ลบโน้ต
async function deleteNote(id) {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': TOKEN
        }
    });

    fetchNotes();
}

// แก้ไขโน้ต
async function editNote(id) {
    const newText = prompt("Edit note:");

    if (!newText) return;

    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN
        },
        body: JSON.stringify({ text: newText })
    });

    fetchNotes();
}

// โหลดครั้งแรก
fetchNotes();