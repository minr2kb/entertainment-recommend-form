def rec(u, x):
    if len(u)==0:
        return u
    elif u[0]==x:
        return rec(u[1:], x)
    else:
        return [u[0]]+rec(u[1:], x)

lst = [1,4,7,5,3,1,6,7,3,4,6,7,5,5,5,3]

def occurs(u, x):
    return len(u)>len(rec(u,x))

print(occurs(lst, 3))

