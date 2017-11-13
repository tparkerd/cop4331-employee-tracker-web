'use strict'
const router     = require('express').Router(),
      passport   = require('passport'),
      path       = require('path'),
      del        = require('del'),
      multer     = require('multer'),
      fs         = require('fs'),
      Employee   = require('../../../models/employee.js')


let uploadService = (req, res) => {

    let dir = path.join('public', 'img', 'uploads', req.headers.username)

    // Utility functions
    // Filter
    let fileFilter = (req, file, cb) => {
      // accept image only
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError = 'Invalid file type. Acceptable file types: jpg, jpeg, png'
        return cb(new Error('Only image files are allowed!'))
      }
      cb(null, true)
    }

    // Clean up
    let cleanFolder = (folderPath) => {
      // delete files inside folder but not the folder itself
      del.sync([`${folderPath}/**`, `!${folderPath}`])
    }

    // Storage
    let storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, dir)
      },
      filename: function(req, file, cb) {
        let fileExtension = file.mimetype.match(/\/(.*?)$/)[1]
        cb(null, (new Date).getTime() + '.'  + fileExtension)
      }
    })

    let opts = {
      dest: dir,
      storage: storage,
      fileFilter: fileFilter,
      cleanFolder: cleanFolder
    }

    // Transfer file
    let upload = multer(opts).single('file')

    // Make directory if it doesn't exist
    let uploadDir = path.join('public', 'img', 'uploads')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)

    // Upload
    upload(req, res, (err) => {
      // An error occurred when uploading
      if (err) {
        // Not an image
        if (req.fileValidationError) {
          return res.status(400).json({ message: req.fileValidationError })
        } else return res.status(500).json({ message: 'File could not be uploaded.', error: err })
      }
      // Otherwise, upload was succesful, so update database url to reflect most recent photo
      // Update database
      let url = req.file.path.split(/\/(.+)/)[1]
      Employee.findOneAndUpdate( { username: req.headers.username }, { picture: url }, (err, user) => {
        if (err) {
          res.status(500).json({ message: 'Picture location could not be updated.' })
        } else res.status(200).json({ message: 'File was uploaded successfully.', user: user})
      })
    })
}

router.post('/', (req, res) => {
  'use strict'
  uploadService(req, res)

})
module.exports = router
