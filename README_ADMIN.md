# Page d'Administration - Studio Vega

## Configuration requise

### Variables d'environnement

Ajoutez les variables suivantes dans votre fichier `.env` :

```env
# Supabase Configuration (déjà configuré)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Clé de service Supabase (pour l'accès admin)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Mot de passe d'administration
SECRET_PASSWORD=votre_mot_de_passe_admin_ici
```

**Important** : La `SUPABASE_SERVICE_ROLE_KEY` se trouve dans votre dashboard Supabase :
1. Allez dans **Settings** → **API**
2. Copiez la **service_role key** (pas l'anon key)
3. Cette clé a des privilèges d'administration et contourne RLS

### Base de données Supabase

#### Table `files` (à créer)

Créez une nouvelle table `files` dans votre base de données Supabase avec la structure suivante :

```sql
CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brief_id UUID REFERENCES briefs(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_files_brief_id ON files(brief_id);
```

#### Bucket de stockage Supabase

1. Créez un bucket nommé `logos` dans votre projet Supabase
2. Configurez les politiques de sécurité pour permettre l'upload et la lecture des fichiers

Exemple de politique pour le bucket `logos` :

```sql
-- Politique pour permettre l'upload de fichiers
CREATE POLICY "Allow uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'logos');

-- Politique pour permettre la lecture des fichiers
CREATE POLICY "Allow reads" ON storage.objects
FOR SELECT USING (bucket_id = 'logos');
```

## Accès à la page d'administration

1. Naviguez vers `/admin` dans votre application
2. Entrez le mot de passe défini dans `SECRET_PASSWORD`
3. Vous aurez accès à tous les briefs soumis avec leurs fichiers

## Fonctionnalités

- **Authentification sécurisée** : Accès protégé par mot de passe
- **Affichage des briefs** : Tous les formulaires soumis dans des onglets
- **Détails complets** : Toutes les réponses organisées par sections
- **Fichiers uploadés** : Accès aux logos et autres fichiers uploadés
- **Interface responsive** : Compatible mobile et desktop
- **Navigation intuitive** : Onglets pour chaque brief

## Structure des données

### Brief
Contient toutes les réponses du formulaire de brief client.

### Files
Contient les informations sur les fichiers uploadés :
- `brief_id` : Référence vers le brief
- `file_name` : Nom du fichier sur le serveur
- `original_name` : Nom original du fichier
- `file_url` : URL publique du fichier
- `file_type` : Type de fichier (logo, etc.)
- `file_size` : Taille du fichier en bytes

## Sécurité

- **Authentification double** : Mot de passe + clé de service Supabase
- **Accès privilégié** : Utilisation de la `service_role_key` pour contourner RLS
- **Protection des données** : Les APIs admin ne sont accessibles qu'après authentification
- **Stockage sécurisé** : Les fichiers sont stockés de manière sécurisée dans Supabase Storage
- **URLs sécurisées** : Les URLs des fichiers sont publiques mais les noms de fichiers sont uniques
- **Aucune exposition** : Aucune donnée sensible n'est exposée dans l'interface

## Dépannage

### Problème : Aucun brief affiché dans l'admin

Si vous voyez "0 formulaire reçu" alors que vous avez des données dans Supabase :

1. **Vérifiez la clé de service** :
   - Assurez-vous que `SUPABASE_SERVICE_ROLE_KEY` est définie dans votre `.env`
   - Cette clé se trouve dans **Settings** → **API** → **service_role key**
   - Redémarrez le serveur après avoir ajouté la variable

2. **Alternative avec politiques RLS** (si vous préférez ne pas utiliser la clé de service) :
   ```sql
   -- Politique pour permettre la lecture des briefs (accès public en lecture seule)
   CREATE POLICY "Allow read access to briefs" ON briefs
   FOR SELECT USING (true);
   
   -- Politique pour permettre l'insertion de nouveaux briefs
   CREATE POLICY "Allow insert briefs" ON briefs
   FOR INSERT WITH CHECK (true);
   
   -- Politique pour les fichiers (si la table files existe)
   CREATE POLICY "Allow read access to files" ON files
   FOR SELECT USING (true);
   
   CREATE POLICY "Allow insert files" ON files
   FOR INSERT WITH CHECK (true);
   ```

3. **Vérifiez les clés API** :
   - Assurez-vous que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correcte
   - Vérifiez que la clé a les permissions de lecture sur la table `briefs`

4. **Vérifiez les logs** :
   - Ouvrez la console du navigateur (F12)
   - Regardez les logs côté serveur
   - Vérifiez les erreurs dans les logs

5. **Testez directement l'API** :
   ```bash
   curl http://localhost:3000/api/admin/briefs
   ```

### Problème : Erreur d'authentification

- Vérifiez que `SECRET_PASSWORD` est défini dans votre `.env`
- Assurez-vous que le fichier `.env` est bien chargé
- Redémarrez le serveur de développement après modification du `.env` 