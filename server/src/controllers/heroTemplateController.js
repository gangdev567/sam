const HeroTemplate = require('../models/heroTemplate');

// 새로운 영웅 템플릿 생성
exports.createHeroTemplate = async (req, res) => {
  try {
    const heroTemplate = new HeroTemplate(req.body);
    await heroTemplate.save();
      res.status(201).json(heroTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 모든 영웅 템플릿 가져오기
exports.getAllHeroTemplates = async (req, res) => {
  try {
    const heroTemplates = await HeroTemplate.find();
    res.status(200).json(heroTemplates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// 특정 영웅 템플릿 가져오기
exports.getHeroTemplateById = async (req, res) => {
  try {
    const heroTemplate = await HeroTemplate.findById(req.params.id);
    if(!heroTemplate) {
      return res.status(404).json({ error: 'HeroTemplate not found' });
    }
    res.status(200).json(heroTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 영웅 템플릿 업데이트
exports.updateHeroTemplate = async (req, res) => {
  try{
    const heroTemplate = await HeroTemplate.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!heroTemplate) {
      return res.status(404).json({ error: 'HeroTemplate not found'});
    }
    res.status(200).json(heroTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

// 특정 영웅 템플릿 삭제
exports.deleteHeroTemplate = async (req, res) => {
  try {
    const heroTemplate = await HeroTemplate.findByIdAndDelete(req.params.id);
    if(!heroTemplate) {
      return res.status(404).json({ error: 'HeroTemplate not found' });
    }
    res.status(200).json({ message: 'HeroTemplate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};