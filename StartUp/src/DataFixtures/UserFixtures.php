<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 20; $i++) {
        $user = (new User())
            ->setFirstName('firstName' . $i)
            ->setLastName('lastName' . $i)
            ->setCredit('credit' . $i)
            ->setEmail('email' . $i)
            ->setRole('role' . $i)
            $user->setPassword($this->passwordHasher->hashPassword($user, 'password' . $i));

        $manager->persist($user);
    }

        $manager->flush();
    }
}
