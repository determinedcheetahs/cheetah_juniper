#!/bin/sh
source ~/.bashrc

dump=25
maxdump=30


while [ $dump -le $maxdump ]
do
echo $dump
        /usr/local/hadoop/bin/hadoop jar hadoop*examples*.jar wordcount /home/hduser/wordcnt/ /home/hduser/wordcnt$dump &
        dump=$(( dump+1 ))
done
echo "=============finished==============="


~                                                              
