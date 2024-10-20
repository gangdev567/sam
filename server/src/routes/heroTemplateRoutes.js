const express = require("express");
const router = express.Router();
const heroTemplateController = require("../controllers/heroTemplateController");

router.use(authMiddleware);

// 새로운 영웅 템플릿 생성
router.post("/", heroTemplateController.createHeroTemplate);

// 모든 영웅 템플릿 생성
router.get("/", heroTemplateController.getAllHeroTemplates);

// 특정 영웅 템플릿 가져오기
router.get("/:id", heroTemplateController.getHeroTemplateById);

// 특정 영웅 템플릿 업데이트
router.put("/:id", heroTemplateController.updateHeroTemplate);

// 특정 영웅 템플릿 삭제
router.delete("/:id", heroTemplateController.deleteHeroTemplate);

module.exports = router;
