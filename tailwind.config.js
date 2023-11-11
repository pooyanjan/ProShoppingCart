/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    container:{
      center:true
    },
    extend: {
      fontFamily: {
        nastaliq: ['iranastaliq'],
        vazir: ['vazir'],
        guy: ['guy'],
      },
    },
  },
  plugins: [],
}

