/**
 * Generates the prompt for the AI to create questions based on topic and difficulty.
 * 
 * @param {string} topic - The topic (e.g., 'pengetahuan kuantitatif', 'aljabar', 'indonesia', 'inggris').
 * @param {string} difficulty - The difficulty level.
 * @param {number} count - Number of questions to generate.
 * @returns {string} The formatted prompt string.
 */
export const generateQuestionPrompt = (topic, difficulty, count = 10) => {
  // Topik yang membutuhkan format matematika (LaTeX)
  const math = ["bilangan", "pengetahuan kuantitatif", "trigonometri", "geometri", "fungsi kuadrat", "peluang dan kaidah pencacahan", "statistika", "sistem persamaan garis lurus dan linear", "baris dan deret", "aritmatika sosial", "matriks", "transformasi geometri"]

  if (math.includes(topic)) {
    if (difficulty == "easy") {
      if (topic == "bilangan") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar, persen, pecahan, desimal,
                tidak ada soal cerita, berikan angka yang kisaran puluhan (0-99), dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                
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

      if (topic == "aritmatika sosial") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang aritmatika sosial yang meliputi diskon, pajak, bunga tunggal, bunga majemuk, harga jual, dan harga beli.
                Tingkat kesulitan: ${difficulty}.
                
                ATURAN PENTING:
                1. Pastikan soalnya bervariasi mencakup semua sub-topik (diskon, pajak, bunga, jual/beli).
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban.
                4. Gunakan format LaTeX untuk matematika (simbol mata uang, persentase, rumus bunga).
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Bunga: \\\\( M_0(1+i)^n \\\\)" adalah BENAR.
    
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
      if (topic == "matriks") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang matriks yang meliputi operasi (penjumlahan, pengurangan, perkalian), determinan, invers, transpose, dan kesamaan matriks.
                Tingkat kesulitan: ${difficulty}.
                
                ATURAN PENTING:
                1. Fokus pada matriks ordo 2x2.
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban.
                4. Gunakan format LaTeX untuk penulisan matriks. Gunakan bmatrix atau pmatrix.
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "\\\\begin{pmatrix} 1 & 2 \\\\\\\\ 3 & 4 \\\\end{pmatrix}" adalah format yang BENAR untuk matriks 2x2.
                   Perhatikan double backslashes untuk new row (\\\\\\\\).
    
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
      if (topic == "transformasi geometri") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang transformasi geometri yang meliputi translasi, refleksi, rotasi, dan dilatasi.
                Tingkat kesulitan: ${difficulty}.
                
                ATURAN PENTING:
                1. Soal bisa berupa transformasi titik atau garis/kurva.
                2. Output HARUS array JSON valid saja. TANPA markdown, TANPA backticks.
                3. Setiap soal HARUS memiliki tepat 3 pilihan jawaban.
                4. Gunakan format LaTeX untuk matematika.
                5. KRUSIAL: Semua backslash LaTeX HARUS di-scape menjadi double backslash (\\\\). 
                   Contoh: "Bayangan titik A(1,2) ... adalah \\\\( A'(... ) \\\\)".
    
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
      if (topic == "penalaran pengetahuan kuantitatif") {
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
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar, persen, pecahan, desimal,
                tidak ada soal cerita, berikan angka kisaran ratusan (100-999), perbanyak pangkat dan akar, dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                Komposisi soal: 30% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 70% topik ${topic}.
                
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
                Komposisi soal: 30% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 70% topik ${topic}.
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
                Komposisi soal: 30% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 70% topik ${topic}.
                
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
      if (topic == "pengetahuan kuantitatif") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan tingkat kesulitan ${difficulty} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                Komposisi soal: 30% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 70% topik ${topic}.
                
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
                Komposisi soal: 30% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 70% topik ${topic}.
                
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
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar, persen, pecahan, desimal,
                tidak ada soal cerita, berikan angka kisaran ribuan (1000-9999), perbanyak perkalian, pembagian, dan operasi pecahan/desimal yang kompleks, dan jawaban acak.
                Komposisi soal: 50% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 50% topik ${topic}.
                
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
                Komposisi soal: 50% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 50% topik ${topic}.
                
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
                Komposisi soal: 50% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 50% topik ${topic}.
                
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
      if (topic == "pengetahuan kuantitatif") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                Komposisi soal: 50% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 50% topik ${topic}.
                
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
                Komposisi soal: 50% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 50% topik ${topic}.
                
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
                Buatkan ${count} soal matematika UTBK SNBT tentang perkalian, pembagian, penjumlahan, pengurangan, pangkat, eksponen, akar, persen, pecahan, desimal,
                tidak ada soal cerita, berikan angka yang sangat tinggi (puluhan ribu hingga ratusan ribu), perbanyak variasi soal yang sangat kompleks, dan jawaban acak.
                Komposisi soal: 70% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 30% topik ${topic}.
                
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
                Komposisi soal: 70% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 30% topik ${topic}.
                
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
                Komposisi soal: 70% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 30% topik ${topic}.
                
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
      if (topic == "pengetahuan kuantitatif") {
        return `
                Andaikan anda adalah pembuat soal UTBK SNBT.
                Buatkan ${count} soal matematika UTBK SNBT tentang topic ${topic} dengan kesulitan sulit dan jawaban acak (karena tadi saya cek jawaban nya ada di tengah terus).
                Komposisi soal: 70% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 30% topik ${topic}.
                
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
                Komposisi soal: 70% soal HARUS menggunakan variabel aljabar (x, y, a, b, dst) dan memanipulasinya, 30% topik ${topic}.
                
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
