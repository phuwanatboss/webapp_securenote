# Conceptual Report - SecureNote

## 1. JS Engine vs Runtime

ในฝั่ง Frontend (Browser) โค้ด JavaScript จะถูกรันโดย JavaScript Engine เช่น V8 (ใน Google Chrome) ซึ่งทำหน้าที่แปลงโค้ด JavaScript ให้เป็น Machine Code และประมวลผลทันที

ส่วนในฝั่ง Backend จะใช้ Node.js ซึ่งเป็น Runtime Environment ที่ใช้ JavaScript Engine (V8) เช่นเดียวกัน แต่สามารถทำงานนอก Browser ได้ เช่น การสร้าง Server และจัดการ API

สรุป:
- Frontend → Browser + V8 Engine
- Backend → Node.js Runtime + V8 Engine

---

## 2. DOM (Document Object Model)

DOM คือโครงสร้างของ HTML ที่อยู่ในรูปแบบ Tree ซึ่ง JavaScript สามารถเข้าถึงและแก้ไขได้

ในโปรเจกต์นี้ใช้ Vanilla JavaScript โดยมีการ:
- ใช้ document.createElement() เพื่อสร้าง <li>
- ใช้ appendChild() เพื่อเพิ่ม element เข้าไปในหน้าเว็บ
- อัปเดต UI แบบ Dynamic โดยไม่ต้อง reload หน้า

ทุกครั้งที่มีการเพิ่ม/ลบ/แก้ไขโน้ต จะมีการเรียก fetchNotes() เพื่อ render DOM ใหม่

---

## 3. HTTP / HTTPS

เมื่อผู้ใช้กดปุ่ม Add, Edit หรือ Delete:
1. Frontend จะส่ง HTTP Request ไปยัง Backend API
2. มีการใช้ Headers เช่น:
   - Content-Type: application/json
   - Authorization: (token)
3. Backend รับ request และตรวจสอบ token
4. Backend ส่ง response กลับ เช่น JSON พร้อม status code

ตัวอย่าง:
- POST → 201 Created
- DELETE → 200 OK
- Unauthorized → 401

HTTP ใช้สำหรับการสื่อสารระหว่าง client และ server  
ส่วน HTTPS เป็นเวอร์ชันที่เข้ารหัสข้อมูล ทำให้ปลอดภัยมากขึ้น (เหมาะสำหรับ production)

---

## 4. Environment Variables

ในโปรเจกต์นี้ใช้ไฟล์ `.env` เพื่อเก็บค่า SECRET_TOKEN และ PORT

เหตุผลที่ไม่เก็บ token ใน frontend:
- ถ้าใส่ใน frontend → ผู้ใช้สามารถดู source code และขโมย token ได้
- ทำให้ระบบไม่มีความปลอดภัย

ดังนั้นจึงเก็บ token ใน backend และใช้ process.env เพื่อเข้าถึงค่า

สรุป:
- `.env` → เก็บข้อมูลสำคัญ
- Frontend → ไม่ควรมี secret
- Backend → เป็นจุดควบคุมความปลอดภัย