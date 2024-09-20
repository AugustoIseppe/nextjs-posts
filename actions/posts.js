"use server";

import { redirect } from 'next/navigation';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

//SERVER ACTIONS
export async function createPost(prevState, formData) {

    //para obtermos os valores basta olhar para a propriedade ''name'' dos inputs
    const title = formData.get('title');// o valor de title vem do ''name'' do input
    const image = formData.get('image'); // o valor de image vem do ''image'' do input
    const content = formData.get('content'); // o valor de content vem do ''content'' do input

    let errors = [];

    //a Função trim remove os espaços em branco do início e do fim da string
    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    }

    if (!content || content.trim().length === 0) {
        errors.push('Content is required');
    }

    if (!image || image.size === 0) {
        errors.push('Image is required');
    }

    if (errors.length > 0) {
        return { errors };
    }

    let imageUrl;
    try {
        imageUrl = await uploadImage(image); //faz o upload da imagem para o cloudinary
    } catch (error) {
        throw new Error('Failed to upload image, Post not created, Please try again');
     }

    // console.log(title, image, content);
    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1
    });

    revalidatePath('/', 'layout');
    redirect('/feed'); //redireciona para a página inicial
}
export async function togglePostLikeStatus(postId) {
    await updatePostLikeStatus(postId, 2);
    revalidatePath('/', 'layout');
}
