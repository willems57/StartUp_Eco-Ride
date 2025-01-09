<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250109021707 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD trajetsencours_id INT DEFAULT NULL, ADD trajetfini_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955C868902D FOREIGN KEY (trajetsencours_id) REFERENCES trajetsencours (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955EA8883F1 FOREIGN KEY (trajetfini_id) REFERENCES trajetsfini (id)');
        $this->addSql('CREATE INDEX IDX_42C84955C868902D ON reservation (trajetsencours_id)');
        $this->addSql('CREATE INDEX IDX_42C84955EA8883F1 ON reservation (trajetfini_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955C868902D');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955EA8883F1');
        $this->addSql('DROP INDEX IDX_42C84955C868902D ON reservation');
        $this->addSql('DROP INDEX IDX_42C84955EA8883F1 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP trajetsencours_id, DROP trajetfini_id');
    }
}
