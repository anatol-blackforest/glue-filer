// Склейка двух файлов
const fs = require("fs")
const path = require("path")

module.exports = (firstFile, secondFile, resultFile) => {

	firstFile = path.resolve(firstFile)
	secondFile = path.resolve(secondFile)
	resultFile = path.resolve(resultFile)

	const readStream1 = fs.createReadStream(firstFile)
	const readStream2 = fs.createReadStream(secondFile)
	const writeStream = fs.createWriteStream(resultFile)

	let data = ""

	readStream1.on("data", chunk => writeStream.write(chunk))

	readStream1.on("end", () => {
	    console.log("file 1 readed!")
		readStream2.on("data", chunk => writeStream.write(chunk))
	})

	readStream2.on("end", () => {
		console.log("file 2 readed!")
		writeStream.end()
	})

	writeStream.on("finish", () => console.log("file writed!"))

	readStream1.on('error', err => console.log(err))
	readStream2.on('error', err => console.log(err))
	writeStream.on('error', err => console.log(err))

}
