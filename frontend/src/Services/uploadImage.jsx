const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default async function uploadImage(formData) {
  try {
    const response = await fetch(`${BACKEND_URL}/features/predict-tumor`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) return { error: data };
    return data;
  } catch (err) {
    console.error(err.message);
    return { error: err.message };
  }
}
