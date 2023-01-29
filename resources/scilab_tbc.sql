-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE `list_of_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `category_id` int(30) DEFAULT NULL,
  `maincategory` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `textbook_companion_chapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preference_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cloud_chapter_err_status` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `textbook_companion_example` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` int(11) NOT NULL,
  `approver_uid` int(11) NOT NULL,
  `number` varchar(10) NOT NULL,
  `caption` varchar(255) NOT NULL,
  `approval_date` int(11) NOT NULL,
  `approval_status` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `cloud_err_status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `textbook_companion_example_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `example_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(500) NOT NULL,
  `filemime` varchar(255) NOT NULL,
  `filesize` int(11) NOT NULL,
  `filetype` varchar(1) NOT NULL,
  `caption` varchar(100) NOT NULL DEFAULT 'None',
  `timestamp` int(11) NOT NULL,
  `xcos_cloud_example_file_error_status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `textbook_companion_preference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proposal_id` int(11) NOT NULL DEFAULT 0,
  `pref_number` int(11) NOT NULL DEFAULT 0,
  `book` varchar(100) NOT NULL DEFAULT 'None',
  `author` varchar(100) NOT NULL DEFAULT 'None',
  `isbn` varchar(25) NOT NULL DEFAULT 'None',
  `publisher` varchar(50) NOT NULL DEFAULT 'None',
  `edition` varchar(2) NOT NULL DEFAULT 'No',
  `year` int(11) NOT NULL DEFAULT 0,
  `category` int(2) NOT NULL DEFAULT 0,
  `approval_status` int(11) NOT NULL DEFAULT 0,
  `nonaicte_book` int(11) NOT NULL DEFAULT 0,
  `pLike` int(11) NOT NULL DEFAULT 0,
  `pDislike` int(11) NOT NULL DEFAULT 0,
  `cloud_pref_err_status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `textbook_companion_proposal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT 0,
  `approver_uid` int(11) NOT NULL DEFAULT 0,
  `full_name` varchar(50) NOT NULL DEFAULT 'None',
  `mobile` varchar(15) NOT NULL DEFAULT '0',
  `gender` varchar(10) NOT NULL DEFAULT 'None',
  `how_project` varchar(50) NOT NULL DEFAULT 'None',
  `course` varchar(50) NOT NULL DEFAULT 'None',
  `branch` varchar(50) NOT NULL DEFAULT 'None',
  `university` varchar(100) NOT NULL DEFAULT 'None',
  `city` varchar(500) NOT NULL DEFAULT 'None',
  `pincode` int(6) NOT NULL DEFAULT 0,
  `state` varchar(500) NOT NULL DEFAULT 'None',
  `country` varchar(500) NOT NULL DEFAULT 'None',
  `faculty` varchar(100) NOT NULL DEFAULT 'None',
  `reviewer` varchar(100) NOT NULL DEFAULT 'None',
  `reference` varchar(9000) NOT NULL DEFAULT 'None',
  `completion_date` int(11) NOT NULL DEFAULT 0,
  `creation_date` int(11) NOT NULL DEFAULT 0,
  `approval_date` int(11) NOT NULL DEFAULT 0,
  `proposal_status` int(11) NOT NULL DEFAULT 0,
  `message` varchar(255) NOT NULL DEFAULT 'None',
  `scilab_version` varchar(20) NOT NULL DEFAULT 'None',
  `operating_system` varchar(50) NOT NULL DEFAULT 'None',
  `teacher_email` varchar(20) NOT NULL DEFAULT 'None',
  `reason` varchar(9000) NOT NULL DEFAULT 'None',
  `failed_reminder` int(11) NOT NULL DEFAULT 0,
  `book_published` int(11) NOT NULL DEFAULT 0,
  `proposal_type` int(11) NOT NULL DEFAULT 0,
  `samplefilepath` varchar(500) NOT NULL DEFAULT 'None',
  `proposed_completion_date` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `xcos_on_cloud_enable_book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2018-12-12 10:38:03

