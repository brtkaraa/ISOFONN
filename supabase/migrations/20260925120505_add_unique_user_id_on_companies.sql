-- Her kullanıcı yalnızca bir firma profili oluşturabilsin
ALTER TABLE companies ADD CONSTRAINT companies_user_id_unique UNIQUE (user_id);