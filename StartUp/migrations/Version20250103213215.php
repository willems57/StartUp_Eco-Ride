<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250103213215 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE booking (id INT AUTO_INCREMENT NOT NULL, ride_id INT NOT NULL, status VARCHAR(255) NOT NULL, credits_used INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_E00CEDDE302A8A70 (ride_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE302A8A70 FOREIGN KEY (ride_id) REFERENCES ride (id)');
        $this->addSql('ALTER TABLE ride ADD voiture_id INT NOT NULL');
        $this->addSql('ALTER TABLE ride ADD CONSTRAINT FK_9B3D7CD0181A8BA FOREIGN KEY (voiture_id) REFERENCES vehicle (id)');
        $this->addSql('CREATE INDEX IDX_9B3D7CD0181A8BA ON ride (voiture_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDE302A8A70');
        $this->addSql('DROP TABLE booking');
        $this->addSql('ALTER TABLE ride DROP FOREIGN KEY FK_9B3D7CD0181A8BA');
        $this->addSql('DROP INDEX IDX_9B3D7CD0181A8BA ON ride');
        $this->addSql('ALTER TABLE ride DROP voiture_id');
    }
}
