a=int(input())
for x in range(a):
    b,c,k=map(int,input().split())
    e=input().strip()
    d=input().strip()
    e=sorted(e)
    d=sorted(d)
    f=''
    g=0
    h=0
    l=0
    r=0
    while l<len(e) and r<len(d):
        if (e[l]<d[r] and g<k) or (h==k):
            f+=e[l]
            l+=1
            g+=1
            h=0
        else:
            f+=d[r]
            r+=1
            h+=1
            g=0
    print(f)
