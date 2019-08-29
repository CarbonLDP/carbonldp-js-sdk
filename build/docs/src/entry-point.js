// Semantic UI

console.log("Hello2");


if( process.env.NODE_ENV === "prod" ) {
	require( "../semantic-ui/dist/semantic.min" );
	require( "../semantic-ui/dist/semantic.min.css" );
} else {
	require( "../semantic-ui/dist/semantic" );
	require( "../semantic-ui/dist/semantic.css" );
}

// Customs
//  js
import "./scripts/main";
//  css
import "./styles/main.scss";