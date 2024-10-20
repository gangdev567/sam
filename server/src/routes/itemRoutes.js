const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.use(authMiddleware);

// 새로운 아이템 생성
router.post("/", itemController.createItem);

// 모든 아이템 가져오기
router.get("/", itemController.getAllItems);

// 특정 아이템 가져오기
router.get("/:id", itemController.getItemById);

// 특정 아이템 업데이트
router.put("/:id", itemController.updateItem);

// 특정 아이템 삭제
router.delete("/:id", itemController.deleteItem);

module.exports = router;
