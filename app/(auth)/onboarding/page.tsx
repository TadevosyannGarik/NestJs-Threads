import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

// Определение асинхронной функции Page
async function Page() {
  // Получение информации о текущем пользователе
  const user = await currentUser();
  // Проверка, существует ли пользователь. Если нет, вернуть null и завершить выполнение функции
  if (!user) return null;

  // Запрос информации о пользователе по его идентификатору
  const userInfo = await fetchUser(user.id);
  // Проверка, прошел ли пользователь процесс онбординга. Если да, перенаправить на главную страницу
  if (userInfo?.onboarded) redirect("/");
  
  // Создание объекта userData, содержащего информацию о пользователе
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  // Возврат JSX-кода, представляющего страницу
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use Threds.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;


// Импорт необходимых библиотек и компонентов. Мы импортируем функции currentUser из библиотеки Clerk/Next.js, 
// redirect из Next.js, функцию fetchUser из пользовательского модуля user.actions и компонент AccountProfile 
// из пользовательского модуля компонентов.Определение асинхронной функции Page. Это функция, представляющая 
// страницу, которая будет отображаться в вашем приложении. Получение информации о текущем пользователе.

// Мы используем await currentUser() для получения информации о текущем пользователе и сохраняем ее в переменную user.
// Проверка существования пользователя.

// Мы проверяем, существует ли объект user. Если нет, то функция возвращает null, и выполнение функции завершается.
// Запрос информации о пользователе.

// Мы используем await fetchUser(user.id) для запроса информации о пользователе по его идентификатору и сохраняем 
// результат в переменную userInfo. Проверка прохождения онбординга.

// Мы проверяем, прошел ли пользователь процесс онбординга, используя userInfo?.onboarded. Если да, мы 
// перенаправляем пользователя на главную страницу с помощью redirect("/");. Создание объекта userData.

// Мы создаем объект userData, содержащий информацию о пользователе, включая идентификатор, имя, имя пользователя, 
// биографию и изображение. Мы используем значения из userInfo, если они доступны, и в противном случае используем 
// значения из user. Возврат JSX-кода страницы.

// Мы возвращаем JSX-код, представляющий страницу. Этот код включает в себя HTML-элементы, такие как заголовок 
// (<h1>), абзац (<p>), и компонент AccountProfile, который использует userData и отображает форму профиля.
// Экспорт функции Page.

// Мы экспортируем функцию Page в качестве компонента страницы по умолчанию, который можно использовать в вашем приложении.