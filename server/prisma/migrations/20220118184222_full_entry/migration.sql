/*
  Warnings:

  - You are about to drop the column `title` on the `entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `entry` DROP COLUMN `title`,
    ADD COLUMN `class` VARCHAR(191) NULL,
    ADD COLUMN `incident` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `school` VARCHAR(191) NULL,
    ADD COLUMN `suspect` VARCHAR(191) NULL,
    ADD COLUMN `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
