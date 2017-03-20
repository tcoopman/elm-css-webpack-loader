port module Stylesheets exposing (..)

import Css.File exposing (..)
import HomepageCss as Homepage


port files : CssFileStructure -> Cmd msg


cssFiles : CssFileStructure
cssFiles =
    toFileStructure [ ( "homepage.css", compile [ Homepage.css ] ) ]


main : CssCompilerProgram
main =
    Css.File.compiler files cssFiles
