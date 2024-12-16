// API Service for database operations
const API_URL = 'http://localhost:3000/api';

class ApiService {
    static async getTours() {
        try {
            const response = await fetch(`${API_URL}/tours`);
            if (!response.ok) throw new Error('Turlar alınamadı');
            return await response.json();
        } catch (error) {
            console.error('Turları getirme hatası:', error);
            throw error;
        }
    }

    static async getTourById(id) {
        try {
            const response = await fetch(`${API_URL}/tours/${id}`);
            if (!response.ok) throw new Error('Tur detayları alınamadı');
            return await response.json();
        } catch (error) {
            console.error('Tur detaylarını getirme hatası:', error);
            throw error;
        }
    }

    static async createTour(tourData) {
        try {
            const response = await fetch(`${API_URL}/tours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tourData)
            });
            if (!response.ok) throw new Error('Tur eklenemedi');
            return await response.json();
        } catch (error) {
            console.error('Tur ekleme hatası:', error);
            throw error;
        }
    }

    static async updateTour(id, tourData) {
        try {
            const response = await fetch(`${API_URL}/tours/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tourData)
            });
            if (!response.ok) throw new Error('Tur güncellenemedi');
            return await response.json();
        } catch (error) {
            console.error('Tur güncelleme hatası:', error);
            throw error;
        }
    }

    static async deleteTour(id) {
        try {
            const response = await fetch(`${API_URL}/tours/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Tur silinemedi');
            return true;
        } catch (error) {
            console.error('Tur silme hatası:', error);
            throw error;
        }
    }
}

export default ApiService;