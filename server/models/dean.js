const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DeanSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  universityId: {
      type: ObjectId,
      required: true,
      ref: 'University'
  }
});

module.exports = mongoose.model('Dean', DeanSchema);