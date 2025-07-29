const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/bfhl", (req, res) => {
    try {
        
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input" });
        }

        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        const concat_chars = [];
        let sum = 0;

        data.forEach(item => {
            if (/^\d+$/.test(item)) {
                const num = parseInt(item);
                sum += num;
                (num % 2 === 0 ? even_numbers : odd_numbers).push(item);
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                concat_chars.push(...item);
            } else {
                special_characters.push(item);
            }
        });

        // Reverse and alternate caps
        const reversed = concat_chars.reverse().join('');
        const concat_string = reversed.split('').map((ch, i) =>
            i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
        ).join('');

        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ is_success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
