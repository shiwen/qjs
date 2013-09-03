#!/usr/bin/env bash

basedir=`dirname $1`
infile=`basename $1`
outfile=`echo ${infile} | sed 's/-[0-9]*//g'`
js-beautify $1 >${basedir}/../${outfile}
