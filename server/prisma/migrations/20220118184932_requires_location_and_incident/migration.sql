/*
  Warnings:

  - Made the column `incident` on table `entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `entry` MODIFY `incident` VARCHAR(191) NOT NULL,
    MODIFY `location` VARCHAR(191) NOT NULL;
