<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250112191302 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trajetsencours ADD prix INT NOT NULL');
        $this->addSql('ALTER TABLE trajetsfini ADD prix INT NOT NULL');
        $this->addSql('ALTER TABLE voiture ADD proprietaire_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE voiture ADD CONSTRAINT FK_E9E2810F76C50E4A FOREIGN KEY (proprietaire_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_E9E2810F76C50E4A ON voiture (proprietaire_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trajetsencours DROP prix');
        $this->addSql('ALTER TABLE trajetsfini DROP prix');
        $this->addSql('ALTER TABLE voiture DROP FOREIGN KEY FK_E9E2810F76C50E4A');
        $this->addSql('DROP INDEX IDX_E9E2810F76C50E4A ON voiture');
        $this->addSql('ALTER TABLE voiture DROP proprietaire_id');
    }
}
