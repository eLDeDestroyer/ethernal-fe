/**
 * Generates the prompt for the AI to create questions based on topic and difficulty.
 * 
 * @param {string} topic - The topic (e.g., 'kuantitatif', 'aljabar', 'indonesia', 'inggris').
 * @param {string} difficulty - The difficulty level.
 * @param {number} count - Number of questions to generate.
 * @returns {string} The formatted prompt string.
 */
export const generateQuestionPrompt = (topic, difficulty, count = 20) => {
  // Topik yang membutuhkan format matematika (LaTeX)
  const math = ["bilangan", "kuantitatif", "trigonometri", "geometri", "fungsi kuadrat", "peluang dan kaidah pencacahan", "statistika", "sistem persamaan garis lurus dan linear", "baris dan deret"]

  if (math.includes(topic)) {
    if (difficulty == "easy") {
      if (topic == "bilangan") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar,
                tidak ada soal cerita, berikan angka yang tinggi puluhan, dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "trigonometri") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang trigonometri, hanya buat sin, cos, tan dengan 0 - 360 derajat sudut istimewa(jadi cuman suruh menebak satu doang) dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "peluang dan kaidah pencacahan" || topic == "statistika" || topic == "baris dan deret" || topic == "sistem persamaan garis lurus dan linear") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} sesuai UTBK dengan tingkat kesulitan ${difficulty} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (untuk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "penalaran kuantitatif") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} sesuai UTBK dengan tingkat kesulitan ${difficulty} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} sesuai UTBK dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;

    }
    if (difficulty == "medium") {
      if (topic == "bilangan") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar,
                tidak ada soal cerita, berikan angka yang tinggi hampir puluhan dan ratusan, perbanyak pangkat dan akar, dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "trigonometri") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang trigonometri, hanya buat sin, cos, tan, csc, sec, cot, dengan 0 - 360 derajat sudut istimewa (jadi cuman suruh menebak satu doang) dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "peluang dan kaidah pencacahan" || topic == "statistika" || topic == "baris dan deret" || topic == "sistem persamaan garis lurus dan linear") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan tingkat kesulitan ${difficulty} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (untuk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "kuantitatif") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan tingkat kesulitan ${difficulty} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
    }
    if (difficulty == "hard") {
      if (topic == "bilangan") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar,
                tidak ada soal cerita, berikan angka yang tinggi hampir puluhan,perbanyak perkalian dan pembagian , dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "trigonometri") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "peluang dan kaidah pencacahan" || topic == "statistika" || topic == "baris dan deret" || topic == "sistem persamaan garis lurus dan linear") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (untuk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "kuantitatif") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
    }
    if (difficulty == "very hard") {
      if (topic == "bilangan") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar,
                tidak ada soal cerita, berikan angka yang tinggi hampir puluhan dan ratusan, perbanyak pangkat dan akar, dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "trigonometri") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "peluang dan kaidah pencacahan" || topic == "statistika" || topic == "baris dan deret" || topic == "sistem persamaan garis lurus dan linear") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (untuk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      if (topic == "kuantitatif") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
      }
      return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
                ATURAN PENTING:
                1. Pastikan soalnya buat acak dan tidak sama dengan soal sebelumnya
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama (array 'answers' isi 3 object).
                4. Gunakan format LaTeX untuk matematika (bukan hanya soal, tapi juga jawabanya) (unutk soal maupun jawaban).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Rumus: \\\\( x^2 \\\\)" adalah BENAR. "Rumus: \\( x^2 \\)" adalah SALAH (akan error JSON).
                   Pastikan semua simbol LaTeX seperti \\\\frac, \\\\sqrt, dll menggunakan double backslash.
    
                Format JSON:
                [
                  {
                    "question": "Pertanyaan...",
                    "answers": [
                      { "answer": "Opsi 1", "is_correct": false },
                      { "answer": "Opsi 2", "is_correct": true },
                      { "answer": "Opsi 3", "is_correct": false }
                    ]
                  }
                ]
            `;
    }
  } else {
    return `
            Andaikan anda adalah pembuat soal UTBK SNBT.
            Buatkan ${count} soal UTBK SNBT tentang topik ${topic} dengan tingkat kesulitan ${difficulty}.
                
            ATURAN PENTING:
            1. Pastikan soalnya bervariasi.
            2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
            3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban yang di random abc nya (jangan B semua, jangan A semua, ataupun jangan C semua, kalo bisa buat agar pembagian jawaban abc itu sama rata), dan jawabannya jangan ada yang sama, buat jawaban agak mirip seperti ada jebakan.
                
            Format JSON:
            [
              {
                "question": "Pertanyaan (Teks paragraf/bacaan jika perlu)...",
                "answers": [
                  { "answer": "Pilihan A", "is_correct": false },
                  { "answer": "Pilihan B", "is_correct": true },
                  { "answer": "Pilihan C", "is_correct": false }
                ]
              }
            ]
        `;
  }
};
