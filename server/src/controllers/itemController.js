const Item = require('../models/itemModel');

// 새로운 아이템 생성
exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

// 모든 아이템 가져오기
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 아이템 가져오기
exports.getItemById = async(req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if(!item) {
      return res.status(404).json({ error: 'Item not found'});
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 아이템 업데이트
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!item) {
      return res.status(404).json({ error: 'Item not found'});
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message})
  }
};

// 특정 아이템 삭제
exports.deleteItem = async(req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if(!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

