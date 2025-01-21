-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 21 jan. 2025 à 20:42
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `startup`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `note` int(11) NOT NULL,
  `commentaire` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `avisvalidation`
--

CREATE TABLE `avisvalidation` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `name` varchar(255) NOT NULL,
  `commentaire` longtext DEFAULT NULL,
  `note` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `message` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20250112202045', '2025-01-12 21:20:55', 243);

-- --------------------------------------------------------

--
-- Structure de la table `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `trajets_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `trajetsencours_id` int(11) DEFAULT NULL,
  `trajetfini_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trajets`
--

CREATE TABLE `trajets` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `voiture_id` int(11) DEFAULT NULL,
  `depart` varchar(255) NOT NULL,
  `arrive` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `duree` time NOT NULL,
  `prix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trajetsencours`
--

CREATE TABLE `trajetsencours` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `voiture_id` int(11) DEFAULT NULL,
  `depart` varchar(255) NOT NULL,
  `arrive` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `duree` int(11) NOT NULL,
  `prix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trajetsfini`
--

CREATE TABLE `trajetsfini` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) NOT NULL,
  `voiture_id` int(11) NOT NULL,
  `depart` varchar(255) NOT NULL,
  `arrive` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `duree` int(11) NOT NULL,
  `prix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `credits` int(11) DEFAULT NULL,
  `api_token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `first_name`, `last_name`, `credits`, `api_token`) VALUES
(1, 'Jose@ecoride.com', '[\"ROLE_SUPER_ADMIN\"]', '$2y$13$u3tnzbuL.tm6aZSk98PHOephL2dwmNDmSVrDNYtA6w95e0ARiJQbm', 'Admin', 'Jose', 1000, 'a31e20a9500c7fdc7d071985514d69ed73d69376f436f572097dead45de7f70cd653ff5726a162e91b2beac94a637959fc2dd3600f4f65a7d4f15864'),
(2, 'user1@example.com', '[\"ROLE_USER\"]', '$2y$13$B8QBGg6ZHCSdpJIQBUPn9eEuuDXyjV.LifsToVLliPR6vRzsGVYJi', 'User1', 'LastName1', 20, 'ebed787117498c11fccf092670e4a18826f969eb3985df7e59615bf37c2513dd5bd7878f55641657b83a413ecaaec40769adc631febdd8163965e296'),
(3, 'user2@example.com', '[\"ROLE_USER\"]', '$2y$13$WA/q5JBFb/LmoC36NC8FEuermQGc7qy42mRWHt4rm/LpiJqCl.Pp.', 'User2', 'LastName2', 20, '918dd16d5f4e8bc156949f9e05b26593d71bce187eaf243ddc248d294e8569a12f851497dc19c97b181edc91357c7c67a6fe33773ac52032003a58c7'),
(4, 'user3@example.com', '[\"ROLE_USER\"]', '$2y$13$qVIVlApjeaABlQNkNmPBeuhh96ySzlP0iaI4U1QJdZyOvYm.gJdw.', 'User3', 'LastName3', 20, '5434915314419dbbc75e1ed71790fc94f1b0e72e1728248c94adbcf8f34978a784c234b5cef1f11b3e97bf59854b7d1c5b8dd6695d2efd1d6fdfcb30'),
(5, 'user4@example.com', '[\"ROLE_USER\"]', '$2y$13$EGssFbwYS4SHRBHO23XZDOr6CRrikk/QQZMWIL0ouRwGKyUjA80f2', 'User4', 'LastName4', 20, '98e10945b1cc5a0992e7061cb1ebb7eb4cb59456245335ae66a029d778bae6b290067556c5cd37f2d0eff8c44c17efd06b29cdd5100954daa49456ec'),
(6, 'user5@example.com', '[\"ROLE_USER\"]', '$2y$13$s1W53lIlaH5FehCpQyHWS.TMuMWcqrIPJBrrb7Tmx9Xl3BpAvx0GG', 'User5', 'LastName5', 20, '335b48437dfe59d5ab672e61722ad44910ec474d98be32ca264328e5330c6ed06e4ce50ebb666d6d431df25f93691adb5050664763b8d5473f42a949'),
(7, 'jeanwillems@hotmail.fr', '[\"ROLE_USER\"]', '$2y$13$Hpddv8OAnWKfaNBcMqrRQePOnUwPQmkKZSs9zyFCjvUa7Yu8qNvkC', 'Jean', 'Willems', 20, '6c820c2b97bc41899a8ed5c61f3d66bffec31505a40cbb9f66b6e1b3ba312b0a'),
(8, 'willems@hotmail.fr', '[\"ROLE_USER\"]', '$2y$13$H9r2espWFqKLIkDNAvg0reY/kJsMyNlxLrWFi2TPw3QKp2XP281j.', 'Jean', 'Willems', 20, '69c340cf40ed2900655dbfa37865b11e7bda5b5d43ef5c6c144f655b25f3b00c');

-- --------------------------------------------------------

--
-- Structure de la table `voiture`
--

CREATE TABLE `voiture` (
  `id` int(11) NOT NULL,
  `proprietaire_id` int(11) DEFAULT NULL,
  `voiture` varchar(255) NOT NULL,
  `dateimat` date NOT NULL,
  `fumeur` tinyint(1) NOT NULL,
  `annimaux` tinyint(1) NOT NULL,
  `marque` varchar(255) NOT NULL,
  `place` int(11) NOT NULL,
  `modele` varchar(255) NOT NULL,
  `couleur` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_8F91ABF0F16F4AC6` (`conducteur_id`);

--
-- Index pour la table `avisvalidation`
--
ALTER TABLE `avisvalidation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_FD65E5B2F16F4AC6` (`conducteur_id`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_42C84955451BDEFF` (`trajets_id`),
  ADD KEY `IDX_42C84955A76ED395` (`user_id`),
  ADD KEY `IDX_42C84955C868902D` (`trajetsencours_id`),
  ADD KEY `IDX_42C84955EA8883F1` (`trajetfini_id`);

--
-- Index pour la table `trajets`
--
ALTER TABLE `trajets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_FF2B5BA9F16F4AC6` (`conducteur_id`),
  ADD KEY `IDX_FF2B5BA9181A8BA` (`voiture_id`);

--
-- Index pour la table `trajetsencours`
--
ALTER TABLE `trajetsencours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_919ADFFAF16F4AC6` (`conducteur_id`),
  ADD KEY `IDX_919ADFFA181A8BA` (`voiture_id`);

--
-- Index pour la table `trajetsfini`
--
ALTER TABLE `trajetsfini`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_BCE79D83F16F4AC6` (`conducteur_id`),
  ADD KEY `IDX_BCE79D83181A8BA` (`voiture_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- Index pour la table `voiture`
--
ALTER TABLE `voiture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_E9E2810F76C50E4A` (`proprietaire_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `avisvalidation`
--
ALTER TABLE `avisvalidation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `trajets`
--
ALTER TABLE `trajets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `trajetsencours`
--
ALTER TABLE `trajetsencours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `trajetsfini`
--
ALTER TABLE `trajetsfini`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `voiture`
--
ALTER TABLE `voiture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `FK_8F91ABF0F16F4AC6` FOREIGN KEY (`conducteur_id`) REFERENCES `trajetsfini` (`id`);

--
-- Contraintes pour la table `avisvalidation`
--
ALTER TABLE `avisvalidation`
  ADD CONSTRAINT `FK_FD65E5B2F16F4AC6` FOREIGN KEY (`conducteur_id`) REFERENCES `trajetsfini` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_42C84955451BDEFF` FOREIGN KEY (`trajets_id`) REFERENCES `trajets` (`id`),
  ADD CONSTRAINT `FK_42C84955A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_42C84955C868902D` FOREIGN KEY (`trajetsencours_id`) REFERENCES `trajetsencours` (`id`),
  ADD CONSTRAINT `FK_42C84955EA8883F1` FOREIGN KEY (`trajetfini_id`) REFERENCES `trajetsfini` (`id`);

--
-- Contraintes pour la table `trajets`
--
ALTER TABLE `trajets`
  ADD CONSTRAINT `FK_FF2B5BA9181A8BA` FOREIGN KEY (`voiture_id`) REFERENCES `voiture` (`id`),
  ADD CONSTRAINT `FK_FF2B5BA9F16F4AC6` FOREIGN KEY (`conducteur_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `trajetsencours`
--
ALTER TABLE `trajetsencours`
  ADD CONSTRAINT `FK_919ADFFA181A8BA` FOREIGN KEY (`voiture_id`) REFERENCES `voiture` (`id`),
  ADD CONSTRAINT `FK_919ADFFAF16F4AC6` FOREIGN KEY (`conducteur_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `trajetsfini`
--
ALTER TABLE `trajetsfini`
  ADD CONSTRAINT `FK_BCE79D83181A8BA` FOREIGN KEY (`voiture_id`) REFERENCES `voiture` (`id`),
  ADD CONSTRAINT `FK_BCE79D83F16F4AC6` FOREIGN KEY (`conducteur_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `voiture`
--
ALTER TABLE `voiture`
  ADD CONSTRAINT `FK_E9E2810F76C50E4A` FOREIGN KEY (`proprietaire_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
