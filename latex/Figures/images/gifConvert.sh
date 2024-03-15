#!/bin/bash 

cd gifs
rm -rf finalGifs
for f in *.gif ;
do
    convert "$f" -coalesce "${f/%gif/jpg}"
done
mkdir finalGifs
mv *.jpg finalGifs
