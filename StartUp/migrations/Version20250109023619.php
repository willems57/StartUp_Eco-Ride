<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250109023619 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trajets ADD conducteur_id INT DEFAULT NULL, ADD voiture_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE trajets ADD CONSTRAINT FK_FF2B5BA9F16F4AC6 FOREIGN KEY (conducteur_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trajets ADD CONSTRAINT FK_FF2B5BA9181A8BA FOREIGN KEY (voiture_id) REFERENCES voiture (id)');
        $this->addSql('CREATE INDEX IDX_FF2B5BA9F16F4AC6 ON trajets (conducteur_id)');
        $this->addSql('CREATE INDEX IDX_FF2B5BA9181A8BA ON trajets (voiture_id)');
        $this->addSql('ALTER TABLE trajetsencours ADD conducteur_id INT DEFAULT NULL, ADD voiture_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE trajetsencours ADD CONSTRAINT FK_919ADFFAF16F4AC6 FOREIGN KEY (conducteur_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trajetsencours ADD CONSTRAINT FK_919ADFFA181A8BA FOREIGN KEY (voiture_id) REFERENCES voiture (id)');
        $this->addSql('CREATE INDEX IDX_919ADFFAF16F4AC6 ON trajetsencours (conducteur_id)');
        $this->addSql('CREATE INDEX IDX_919ADFFA181A8BA ON trajetsencours (voiture_id)');
        $this->addSql('ALTER TABLE trajetsfini ADD conducteur_id INT NOT NULL, ADD voiture_id INT NOT NULL');
        $this->addSql('ALTER TABLE trajetsfini ADD CONSTRAINT FK_BCE79D83F16F4AC6 FOREIGN KEY (conducteur_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trajetsfini ADD CONSTRAINT FK_BCE79D83181A8BA FOREIGN KEY (voiture_id) REFERENCES voiture (id)');
        $this->addSql('CREATE INDEX IDX_BCE79D83F16F4AC6 ON trajetsfini (conducteur_id)');
        $this->addSql('CREATE INDEX IDX_BCE79D83181A8BA ON trajetsfini (voiture_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trajets DROP FOREIGN KEY FK_FF2B5BA9F16F4AC6');
        $this->addSql('ALTER TABLE trajets DROP FOREIGN KEY FK_FF2B5BA9181A8BA');
        $this->addSql('DROP INDEX IDX_FF2B5BA9F16F4AC6 ON trajets');
        $this->addSql('DROP INDEX IDX_FF2B5BA9181A8BA ON trajets');
        $this->addSql('ALTER TABLE trajets DROP conducteur_id, DROP voiture_id');
        $this->addSql('ALTER TABLE trajetsencours DROP FOREIGN KEY FK_919ADFFAF16F4AC6');
        $this->addSql('ALTER TABLE trajetsencours DROP FOREIGN KEY FK_919ADFFA181A8BA');
        $this->addSql('DROP INDEX IDX_919ADFFAF16F4AC6 ON trajetsencours');
        $this->addSql('DROP INDEX IDX_919ADFFA181A8BA ON trajetsencours');
        $this->addSql('ALTER TABLE trajetsencours DROP conducteur_id, DROP voiture_id');
        $this->addSql('ALTER TABLE trajetsfini DROP FOREIGN KEY FK_BCE79D83F16F4AC6');
        $this->addSql('ALTER TABLE trajetsfini DROP FOREIGN KEY FK_BCE79D83181A8BA');
        $this->addSql('DROP INDEX IDX_BCE79D83F16F4AC6 ON trajetsfini');
        $this->addSql('DROP INDEX IDX_BCE79D83181A8BA ON trajetsfini');
        $this->addSql('ALTER TABLE trajetsfini DROP conducteur_id, DROP voiture_id');
    }
}
