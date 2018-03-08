//@ts-check
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('./../config/passport');

module.exports = {
    findShoollId(clients, role) {
        return clients.find(client => client.clientRole === role).client.schoolId;
    },

    calculateFourNumbersBySRMark(mark) {
        // Count of numbers(number of solved tasks)
        if (typeof mark === 'undefined') return { firstNumber: null, secondNumber: null, thirdNumber: null, fourthNumber: null };
        let firstNumber = 0;
        let markNumbers = mark.match(/[1-9]/g);
        if (markNumbers) {
            firstNumber += markNumbers.length;
        }

        // Sum of numbers divided by count of numbers > 0(average number of attempts per one solved task)
        let secondNumber = 0;
        let sumOfNumbers = 0;
        let countOfNumbersMoreThenZero = 0;
        
        if (markNumbers) {
            countOfNumbersMoreThenZero += markNumbers.length;
            sumOfNumbers = markNumbers.reduce((sum, number) => sum += parseInt(number), 0);
        }
        if(countOfNumbersMoreThenZero > 0)
            secondNumber = sumOfNumbers / countOfNumbersMoreThenZero;

        // Count of big letters(number of tasks the answer was viewed)
        let thirdNumber = 0;
        let markBigLetters = mark.match(/[A-J]/g);

        let countOfAllLetters = 0;

        if (markBigLetters) {
            countOfAllLetters += markBigLetters.length;
            thirdNumber += markBigLetters.length;
        }

        // Sum of all big and small letters divided by count of all letters(average number of attempts per one no solved task)
        let fourthNumber = 0;
        let lettersToNumbersSet = {
            'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
            'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9
        };

        let sumOfAllLetters = 0;
        let markSmallLetters = mark.match(/[a-i]/g);            

        if (markSmallLetters) {
            countOfAllLetters += markSmallLetters.length;
            markSmallLetters.forEach(letter => sumOfAllLetters += lettersToNumbersSet[letter]);
        }
        
        if (countOfAllLetters > 0)
        fourthNumber = sumOfAllLetters / countOfAllLetters;

        return { firstNumber, secondNumber, thirdNumber, fourthNumber };
        
    },

    calculateAVGFourNumbersBySRMark(fourNumbersMarks) {
        let avg = { firstNumber: 0, secondNumber: 0, thirdNumber: 0, fourthNumber: 0 };

        if (!Array.isArray(fourNumbersMarks)) {
            throw new Error('Shoud be an array');
        }

        fourNumbersMarks.forEach(fourNumbers => {
            avg.firstNumber += fourNumbers.firstNumber;
            avg.secondNumber += fourNumbers.secondNumber;
            avg.thirdNumber += fourNumbers.thirdNumber;
            avg.fourthNumber += fourNumbers.fourthNumber;
        });

        avg.firstNumber /= fourNumbersMarks.length;
        avg.secondNumber /= fourNumbersMarks.length;
        avg.thirdNumber /= fourNumbersMarks.length;
        avg.fourthNumber /= fourNumbersMarks.length;

        return avg;
    },

    calculateAVGKRMarks(marks) {
        return marks.reduce((sum, mark) => sum += parseInt(mark), 0) / marks.length;
    },

    calculateDispersion(data) {
        const n = data.length;
        const avgX = data.reduce((sum, x) => sum += parseInt(x), 0) / n;
        return Math.sqrt((1 / (n - 1)) * (data.reduce((sum, x) => sum += Math.pow((parseInt(x) - avgX), 2), 0)));
    },

    decodeBase64Image(dataString) {
        const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
    
        return new Buffer(matches[2], 'base64');
    },
    
    saveImage(imageData, imageName) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '../public/images', imageName), imageData, err => {
                err ? reject(err) : resolve({ uploadStaus: 'Ok' });
            });
        });
        
    },

    jwtSignUser(user) {
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign({
            sub: user.id
        }, config.authentication.jwtSecret, {
            expiresIn: ONE_WEEK
        });
    }
};