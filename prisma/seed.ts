import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy recipes
  const recipe1 = await prisma.recipe.upsert({
    where: { title: 'Spaghetti Bolognese' },
    update: {},
    create: {
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian dish',
      ingredients:
        'Spaghetti, minced beef, tomato sauce, onions, garlic, olive oil, salt, pepper',
      instructions:
        '1. Cook the spaghetti. 2. Fry the minced beef. 3. Add the tomato sauce to the beef. 4. Serve the spaghetti with the sauce.',
    },
  });

  const recipe2 = await prisma.recipe.upsert({
    where: { title: 'Chicken Curry' },
    update: {},
    create: {
      title: 'Chicken Curry',
      description: 'A spicy Indian dish',
      ingredients:
        'Chicken, curry powder, onions, garlic, coconut milk, olive oil, salt, pepper',
      instructions:
        '1. Fry the chicken. 2. Add the curry powder to the chicken. 3. Add the coconut milk. 4. Serve the curry with rice.',
    },
  });

  console.log({ recipe1, recipe2 });

  // Create two users with profiles and posts
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      profile: {
        create: {
          bio: 'Food lover and blogger',
        },
      },
      posts: {
        create: [
          {
            title: 'Alice’s Favorite Pasta',
            content: 'A delicious pasta recipe I love.',
            published: true,
          },
          {
            title: 'Exploring Indian Cuisine',
            content: 'Sharing my experience with Indian dishes.',
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
      profile: {
        create: {
          bio: 'Chef and food enthusiast',
        },
      },
      posts: {
        create: [
          {
            title: 'Mastering Curry',
            content: 'Tips for making the perfect curry.',
            published: true,
          },
          {
            title: 'The Art of Baking Bread',
            content: 'Baking bread at home is easier than you think!',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
