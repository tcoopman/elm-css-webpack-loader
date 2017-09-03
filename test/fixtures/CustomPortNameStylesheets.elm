port module CustomPortNameStylesheets exposing (..)

import Css.File exposing (..)
import HomepageCss as Homepage


port customFiles : CssFileStructure -> Cmd msg


cssFiles : CssFileStructure
cssFiles =
    toFileStructure [ ( "customPortHomepage.css", compile [ Homepage.css ] ) ]


main : CssCompilerProgram
main =
    Css.File.compiler customFiles cssFiles
