package middleware

import (
	"net/http"
	// "log"
	"os"

	"github.com/dgrijalva/jwt-go"

	// okta "github.com/okta/okta-sdk-golang"
	okta "github.com/okta/okta-jwt-verifier-golang"
)
const ISSUER = "https://dev-612778.okta.com/oauth2/default"
const CLIENT_ID = "0oarosrzbPITpCtHs356"

func OktaAuth(next http.Handler) http.Handler {
	// os.Getenv("ISSUER")
	// os.Getenv("CLIENT_ID")

	claims := map[string]string{}
	claims["aud"] = ISSUER
	claims["cid"] = CLIENT_ID

	jwtVerifierSetup := okta.JwtVerifier{
		Issuer: ISSUER,
		ClaimsToValidate: claims
	}

	verifier := jwtVerifierSetup.New()

	token, err := verifier.VerifyAccessToken()
}
func OktaAuthorize(next http.Handler) http.Handler {
}

// func Authenticate(next http.Handler) http.Handler {

//   return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
// 		// We can obtain the session token from the requests cookies, which come with every request
// 		c, err := req.Cookie("tkn")
// 		if err != nil {
// 			if err == http.ErrNoCookie {
// 				// If the cookie is not set, return an unauthorized status
// 				w.WriteHeader(http.StatusUnauthorized)
// 				return
// 			}
// 			// For any other type of error, return a bad request status
// 			w.WriteHeader(http.StatusBadRequest)
// 			return
// 		}

// 		// Get the JWT string from the cookie
// 		tknStr := c.Value

// 		// Initialize a new instance of `Claims`
// 		claims := &Claims{}

// 		// Parse the JWT string and store the result in `claims`.
// 		// Note that we are passing the key in this method as well. This method will return an error
// 		// if the token is invalid (if it has expired according to the expiry time we set on sign in),
// 		// or if the signature does not match
// 		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
// 			return jwtKey, nil
// 		})
// 		if !tkn.Valid {
// 			// || tkn.Role < r {
// 			w.WriteHeader(http.StatusUnauthorized)
// 			return
// 		}

// 		if err != nil {
// 			if err == jwt.ErrSignatureInvalid {
// 				w.WriteHeader(http.StatusUnauthorized)
// 				return
// 			}
// 			w.WriteHeader(http.StatusBadRequest)
// 			return
// 		}

// 		// run the handler if tkn is valid
//     next.ServeHTTP(w, req)
//   })

// }

// func Authorize(w http.ResponseWriter, req *http.Request) {
// 	// looks at the users role within the cookie

// }











// func Tkn(w http.ResponseWriter, req *http.Request) {
// 		// (BEGIN) The code uptil this point is the same as the first part of the `Welcome` route
// 	c, err := req.Cookie("tkn")
// 	if err != nil {
// 		if err == http.ErrNoCookie {
// 			w.WriteHeader(http.StatusUnauthorized)
// 			return
// 		}
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}
// 	tknStr := c.Value
// 	claims := &Claims{}
// 	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
// 		return jwtKey, nil
// 	})
// 	if !tkn.Valid {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		return
// 	}
// 	if err != nil {
// 		if err == jwt.ErrSignatureInvalid {
// 			w.WriteHeader(http.StatusUnauthorized)
// 			return
// 		}
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}
// 	// (END) The code up-till this point is the same as the first part of the `Welcome` route

// 	// We ensure that a new token is not issued until enough time has elapsed
// 	// In this case, a new token will only be issued if the old token is within
// 	// 30 seconds of expiry. Otherwise, return a bad request status
// 	if time.Unix(claims.ExpiresAt, 0).Sub(time.Now()) > 30 * time.Second {
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	// Now, create a new token for the current use, with a renewed expiration time
// 	expirationTime := time.Now().Add(5 * time.Minute)
// 	claims.ExpiresAt = expirationTime.Unix()
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	tokenString, err := token.SignedString(jwtKey)
// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}

// 	// Set the new token as the users `token` cookie
// 	http.SetCookie(w, &http.Cookie{
// 		Name:    "tkn",
// 		Value:   tokenString,
// 		Expires: expirationTime,
// 	})
// }