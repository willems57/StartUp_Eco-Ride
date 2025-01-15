<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 20; $i++) {
        $user = (new User())
            ->setFirstName('firstName' . $i)
            ->setLastName('lastName' . $i)
            ->setCredits('credits' . $i)
            ->setRoles(['ROLE_USER'])
            ->setEmail('email' . $i);
            $user->setPassword($this->passwordHasher->hashPassword($user, 'password' . $i));
        $manager->persist($user);
    }

        $manager->flush();
    }
}
