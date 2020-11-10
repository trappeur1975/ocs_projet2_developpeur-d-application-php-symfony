<?php

// BEGIN iThemes Security - Ne modifiez pas ou ne supprimez pas cette ligne
// iThemes Security Config Details: 2
define( 'DISALLOW_FILE_EDIT', true ); // Désactivez l’éditeur de code - iThemes Security > Réglages > Ajustements WordPress > Éditeur de code
// END iThemes Security - Ne modifiez pas ou ne supprimez pas cette ligne

/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en « wp-config.php » et remplir les
 * valeurs.
 *
 * Ce fichier contient les réglages de configuration suivants :
 *
 * Réglages MySQL
 * Préfixe de table
 * Clés secrètes
 * Langue utilisée
 * ABSPATH
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'chaletcavier' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'root' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', '' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/**
 * Type de collation de la base de données.
 * N’y touchez que si vous savez ce que vous faites.
 */
define( 'DB_COLLATE', '' );

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'iE~}uW!_9`Z`|uo1WNS3[%ha_Ivrg5z5mG:aW4:XBk,tWo]R~;Ee3v;,KeH7Y)d/' );
define( 'SECURE_AUTH_KEY',  '3;&jPY;l;7e<.w^x[t+g?-|cA#AB8.ICg8yJIll*mFmV&eqF^A[]fu.Uu]4yoXb,' );
define( 'LOGGED_IN_KEY',    '(nL)LgAN[`,qYgaF7)(O!c`aotA8=)T!2tZF)@wPBpTaJmXE1+_jKP?JK!UhQp7u' );
define( 'NONCE_KEY',        'wT@TT]CnMYb@@+f:%GuK7K*:s*?lg*IUV==sN+$2@L(NrS4Wpz$;NH<r?79-R{LP' );
define( 'AUTH_SALT',        'bCK.X;1,[MP@4 e{!sq`[!W}ImmCLUT7=hqj_(r]W]0|>Jw&H%.vu{GPA|2(E 3#' );
define( 'SECURE_AUTH_SALT', 'R]R1<?Qo 1h;X6o0{Eo/{QlUgJ[QA+Ee57z2^};+glEiQ+x&nueNw36T^KTC,~?,' );
define( 'LOGGED_IN_SALT',   'Z]!+C81g_>|hp+V(Rh<[/|/!opkk2_v&9E#zyr3YQTUEk``E?HAS>ii1zZu1[Jnb' );
define( 'NONCE_SALT',       '7]&)] `c]&3qwF7,3g0@zA?v;=5`0GZcEXeYpV<>lqCU[UHb30%@sIz8W_<H~]k^' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'l9s3ww0kx_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( ! defined( 'ABSPATH' ) )
  define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once( ABSPATH . 'wp-settings.php' );
